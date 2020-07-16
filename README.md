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

### Usage with remote references

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
          $ref: 'https://schemas.example.com/user'
`

await parser.parse(asyncapiWithAvro)
```

### Usage with Confluent Schema Registry

#### Create an API key

![](./assets/create-key.png)

#### Copy the key and the secret

![](./assets/key-secret-details.png)

#### Use them on your AsyncAPI document

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
          $ref: 'https://LY422RBU2HN6JQ5T:+f8wz9a0iM06AX7xfwbzSM9YPw/JIkr22Cvl5EKT5Hb1d/nz5nOpbXV/vZC+Iz5c@example.europe-west3.gcp.confluent.cloud/subjects/test/versions/1/schema'
`

await parser.parse(asyncapiWithAvro)
```

## Limitations

### Float and double-precision numbers

JSON numbers ([RFC 4627, section 2.4](http://tools.ietf.org/html/rfc4627)) don't define any limit to the scale and/or precision of numbers. That said, we can enforce limits on `int` and `long` but we can't enforce them on `float` and `double` because they can't accurately be represented on JSON Schema.

### Hardcoded key and secret

This is not a limitation of this package per se but of the [JSON Reference RFC](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03). So far, you can only hardcode the values for `key` and `secret` on the `$ref` URL.
