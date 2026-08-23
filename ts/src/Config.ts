
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TempMail',
        slug: "temp-mail",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://hub.juheapi.com/temp-mail/v1",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      email: {
      },

      mailbox: {
      },

    }
  }


  entity = {
    "email": {
      "fields": [
        {
          "name": "attachments",
          "req": true,
          "short": "List of attachments in the email",
          "type": "`$ARRAY`"
        },
        {
          "name": "body",
          "req": true,
          "short": "Body content of the email",
          "type": "`$STRING`"
        },
        {
          "name": "from",
          "req": true,
          "short": "Email address of the sender",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Unique identifier for the email",
          "type": "`$STRING`"
        },
        {
          "name": "received_at",
          "short": "Unix timestamp when the email was received",
          "type": "`$INTEGER`"
        },
        {
          "name": "subject",
          "req": true,
          "short": "Subject line of the email",
          "type": "`$STRING`"
        }
      ],
      "name": "email",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "mailbox_12345",
                    "kind": "query",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/get-emails",
              "parts": [
                "get-emails"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "mailbox": {
      "fields": [
        {
          "name": "domain",
          "short": "Optional domain for the temporary email address",
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "short": "Generated temporary email address",
          "type": "`$STRING`"
        },
        {
          "name": "expires_at",
          "short": "Unix timestamp when the mailbox expires",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the mailbox",
          "type": "`$STRING`"
        }
      ],
      "name": "mailbox",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/create",
              "parts": [
                "create"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

