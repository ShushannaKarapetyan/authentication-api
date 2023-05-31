module.exports = {
    definition: {
        "openapi": "3.0.3",
        "info": {
            "title": "User Authentication API",
            "description": "This is a simple user authentication API written in Node.js. The API allows users to register, login, and access their profiles.",
            "contact": {
                "email": "karapetyan.shushanna1@gmail.com"
            },
            "license": {
                "name": "Apache 2.0",
                "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            "version": "1.0.11"
        },
        "servers": [
            {
                "url": "http://localhost:3000"
            }
        ],
        "paths": {
            "/auth/register": {
                "post": {
                    "tags": [
                        "user"
                    ],
                    "summary": "Register user",
                    "description": "",
                    "operationId": "register",
                    "requestBody": {
                        "required": true,
                        "description": "Registered user object",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegisterUser"
                                }
                            },
                            "application/xml": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegisterUser"
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "User registered successfully",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "example": {
                                            "success": true,
                                            "data": {
                                                "message": "User registered successfully."
                                            }
                                        }
                                    }
                                },
                                "application/xml": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "success": {
                                                "type": "boolean"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "message": {
                                                        "type": "string",
                                                        "example": "User registered successfully."
                                                    }
                                                }
                                            }
                                        },
                                        "xml": {
                                            "name": "registerUser"
                                        }
                                    }
                                }
                            }
                        },
                        "409": {
                            "description": "This user already exists"
                        }
                    }
                }
            },
            "/auth/login": {
                "post": {
                    "tags": [
                        "user"
                    ],
                    "summary": "Logs user into the system",
                    "description": "",
                    "operationId": "login",
                    "requestBody": {
                        "required": true,
                        "description": "",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LoginUser"
                                }
                            },
                            "application/xml": {
                                "schema": {
                                    "$ref": "#/components/schemas/LoginUser"
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "You are successfully logged in.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "example": {
                                            "success": true,
                                            "data": {
                                                "message": "You are successfully logged in.",
                                                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzYxYjQxYTI3NjNkNjZhOGU2ZGRiNyIsImVtYWlsIjoia2FyYXBldHlhbi5zaHVzaGFubmExQGdtYWlsLmNvbSIsImlhdCI6MTY4NTQ2Nzg5OCwiZXhwIjoxNjg1NDcxNDk4fQ.ecLekzt0QcIMFFu5bPrq2yH7h_pMbXywZPa8dlAHxfU"
                                            }
                                        }
                                    }
                                },
                                "application/xml": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "success": {
                                                "type": "boolean"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "message": {
                                                        "type": "string",
                                                        "example": "You are successfully logged in."
                                                    },
                                                    "token": {
                                                        "type": "string",
                                                        "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzYxYjQxYTI3NjNkNjZhOGU2ZGRiNyIsImVtYWlsIjoia2FyYXBldHlhbi5zaHVzaGFubmExQGdtYWlsLmNvbSIsImlhdCI6MTY4NTQ2Nzg5OCwiZXhwIjoxNjg1NDcxNDk4fQ.ecLekzt0QcIMFFu5bPrq2yH7h_pMbXywZPa8dlAHxfU"
                                                    }
                                                }
                                            }
                                        },
                                        "xml": {
                                            "name": "loginUser"
                                        }
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "User not found"
                        }
                    }
                }
            },
            "/me": {
                "get": {
                    "tags": [
                        "profile"
                    ],
                    "summary": "Get the logged in user",
                    "description": "",
                    "operationId": "me",
                    "parameters": [
                        {
                            "name": "authorization",
                            "in": "header",
                            "description": "The profile that needs to be fetched.",
                            "required": true,
                            "schema": {
                                "type": "string",
                                "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzYxYjQxYTI3NjNkNjZhOGU2ZGRiNyIsImVtYWlsIjoia2FyYXBldHlhbi5zaHVzaGFubmExQGdtYWlsLmNvbSIsImlhdCI6MTY4NTQ4MDU1MSwiZXhwIjoxNjg1NDg0MTUxfQ.eharoO9Cf-kBU5NnVkvu7--Gek--bMF85z1f4mo6wVs"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                },
                                "application/xml": {
                                    "schema": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "User is not authorized"
                        }
                    }
                }
            }
        },
        "components": {
            "schemas": {
                "RegisterUser": {
                    "required": [
                        "username",
                        "email",
                        "password"
                    ],
                    "type": "object",
                    "properties": {
                        "username": {
                            "type": "string",
                            "example": "Shushanna"
                        },
                        "email": {
                            "type": "string",
                            "example": "karapetyan.shushanna1@gmail.com"
                        },
                        "password": {
                            "type": "string",
                            "example": "Password_123"
                        }
                    },
                    "xml": {
                        "name": "registerUser"
                    }
                },
                "LoginUser": {
                    "required": [
                        "email",
                        "password"
                    ],
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string",
                            "example": "karapetyan.shushanna1@gmail.com"
                        },
                        "password": {
                            "type": "string",
                            "example": "Password_123"
                        }
                    },
                    "xml": {
                        "name": "loginUser"
                    }
                },
                "User": {
                    "required": [
                        "_id",
                        "username",
                        "email"
                    ],
                    "type": "object",
                    "properties": {
                        "success": {
                            "type": "boolean"
                        },
                        "data": {
                            "type": "object",
                            "properties": {
                                "_id": {
                                    "type": "string",
                                    "example": "64761b41a2763d66a8e6ddb7"
                                },
                                "username": {
                                    "type": "string",
                                    "example": "Shushanna"
                                },
                                "email": {
                                    "type": "string",
                                    "example": "karapetyan.shushanna1@gmail.com"
                                }
                            }
                        }
                    },
                    "xml": {
                        "name": "user"
                    }
                },
                "ApiResponse": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "type": {
                            "type": "string"
                        },
                        "message": {
                            "type": "string"
                        }
                    },
                    "xml": {
                        "name": "##default"
                    }
                }
            },
            "requestBodies": {
                "RegisterUser": {
                    "description": "User object that needs to be added to the register",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RegisterUser"
                            }
                        },
                        "application/xml": {
                            "schema": {
                                "$ref": "#/components/schemas/RegisterUser"
                            }
                        }
                    }
                },
                "LoginUser": {
                    "description": "",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/LoginUser"
                            }
                        },
                        "application/xml": {
                            "schema": {
                                "$ref": "#/components/schemas/LoginUser"
                            }
                        }
                    }
                }
            },
            "securitySchemes": {
                "auth": {
                    "type": "oauth2",
                    "flows": {
                        "implicit": {
                            "authorizationUrl": "",
                        }
                    }
                },
                "api_key": {
                    "type": "apiKey",
                    "name": "api_key",
                    "in": "header"
                }
            }
        }
    },
    apis: ["./routes/*.js"],
};
