# Avro Schema Parser

An AsyncAPI schema parser for Avro 1.x schemas.

## Installation

```
npm install @asyncapi/avro-schema-parser
```

## Usage

```js
const parser = require('@asyncapi/parser')
const avroSchemaParser = require('@asyncapi/avro-schema-parser')

parser.registerSchemaParser(avroSchemaParser);

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload: # The following is an Avro schema in YAML format (JSON format is also supported)
          type: record
          doc: User information
          fields:
            - name: displayName
              type: string
            - name: email
              type: string
            - name: age
              type: int
`

await parser.parse(asyncapiWithAvro)
```

It also supports referencing remote Avro schemas:

```js
const parser = require('@asyncapi/parser')
const avroSchemaParser = require('@asyncapi/avro-schema-parser')

parser.registerSchemaParser(avroSchemaParser)

const asyncapiWithAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'https://key:secret@schema-registry.example.com/subjects/test/versions/1/schema'
`

await parser.parse(asyncapiWithAvro)
```
