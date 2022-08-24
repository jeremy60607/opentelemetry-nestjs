import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import * as api from '@opentelemetry/api';

let provider: NodeTracerProvider;
export function tracing() {
  provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'api-service',
      [SemanticResourceAttributes.SERVICE_NAMESPACE]: 'hahaha',
    }),
  });

  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      new JaegerExporter({
        host: 'localhost',
        port: 6832,
        // url: 'http://localhost:9411/api/v2/spans',
        // serviceName: 'service-name',
      }),
    ),
  );

  provider.register();

  registerInstrumentations({
    instrumentations: [
      // Express instrumentation expects HTTP layer to be instrumented
      new HttpInstrumentation({
        requestHook: (span, request) => {
          span.setAttribute('custom request hook attribute', 'request');
        },
      }),
      new ExpressInstrumentation(),
      new NestInstrumentation(),
    ],
  });
}

function startSpan(spanName: string): api.Span {
  const tr = provider.getTracer('api-service');
  const span = tr.startSpan(spanName);
  return span;
}

function endSpan(span: api.Span) {
  span.end();
}

export function traceSpan(spanName?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;

    descriptor.value = async function (...args: []) {
      const spanKey = spanName ?? propertyKey;

      const span = startSpan(spanKey);
      const result = await method.apply(this, args);
      endSpan(span);
      return result;
    };
  };
}
