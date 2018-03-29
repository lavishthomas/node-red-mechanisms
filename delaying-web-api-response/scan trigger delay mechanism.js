[
    {
        "id": "eb39baf9.3d1ac8",
        "type": "inject",
        "z": "bb9c6da7.96968",
        "name": "",
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "repeat": "10",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 420,
        "wires": [
            [
                "bcbc9c85.a1024"
            ]
        ]
    },
    {
        "id": "8121654.4ffdc98",
        "type": "delay",
        "z": "bb9c6da7.96968",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 460,
        "y": 260,
        "wires": [
            [
                "7024e0a4.d1074",
                "b5285ac4.5fc408"
            ]
        ]
    },
    {
        "id": "4350328d.3b0d7c",
        "type": "function",
        "z": "bb9c6da7.96968",
        "name": "topic splitter",
        "func": "msg = msg;\nmsg.topic = 'request';\nmsg.payload = 'request started' ;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 290,
        "y": 80,
        "wires": [
            [
                "7024e0a4.d1074",
                "3088f7f8.48ee28"
            ]
        ]
    },
    {
        "id": "e1217b0c.ad3448",
        "type": "http response",
        "z": "bb9c6da7.96968",
        "name": "scanresponse",
        "statusCode": "",
        "headers": {},
        "x": 920,
        "y": 160,
        "wires": []
    },
    {
        "id": "486059b7.54a918",
        "type": "http in",
        "z": "bb9c6da7.96968",
        "name": "scanrequest",
        "url": "/device/scan",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 90,
        "y": 80,
        "wires": [
            [
                "4350328d.3b0d7c"
            ]
        ]
    },
    {
        "id": "bcbc9c85.a1024",
        "type": "function",
        "z": "bb9c6da7.96968",
        "name": "scan status fulfiller",
        "func": "msg = msg;\nstatus = global.get(\"scan_enabled\");\nmsg.payload = status;\n\nif (status === true) {\n    global.set(\"scan_enabled\", false);\n}\nelse {\n    global.set(\"scan_enabled\", false);\n}\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 330,
        "y": 420,
        "wires": [
            [
                "61a8424d.b708bc"
            ]
        ]
    },
    {
        "id": "aad89496.d269c8",
        "type": "function",
        "z": "bb9c6da7.96968",
        "name": "check_scan_status",
        "func": "msg = msg;\nstatus = global.get(\"scan_enabled\");\nmsg.payload = status;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 330,
        "y": 360,
        "wires": [
            [
                "ac79819c.d8803"
            ]
        ]
    },
    {
        "id": "7024e0a4.d1074",
        "type": "function",
        "z": "bb9c6da7.96968",
        "name": "topic_checker_delay",
        "func": "return_msg = msg;\n\nif (msg.topic === \"delay\") {\n    return_msg.topic = \"request_fulfilled\";\n    scan_status = global.get(\"scan_enabled\");\n    if (scan_status === false) {\n        return_msg.topic === 'request_fulfilled'\n        return_msg.payload = 'payload for out';\n    }\n}\nelse if (msg.topic === \"request\") {\n    global.set(\"scan_enabled\", true);\n    return_msg.topic = \"delay\";\n    return_msg.payload = \"request started in splitter\";\n}\n\nreturn return_msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 320,
        "y": 180,
        "wires": [
            [
                "edb1d0ae.f88fe",
                "a3e82c3c.8e43b"
            ]
        ]
    },
    {
        "id": "edb1d0ae.f88fe",
        "type": "switch",
        "z": "bb9c6da7.96968",
        "name": "splitting request and delay",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "request_fulfilled",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "delay",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 610,
        "y": 180,
        "wires": [
            [
                "e1217b0c.ad3448",
                "b38aa4c5.d08b48"
            ],
            [
                "8121654.4ffdc98",
                "16844ff5.890e8"
            ]
        ]
    },
    {
        "id": "61a8424d.b708bc",
        "type": "debug",
        "z": "bb9c6da7.96968",
        "name": "scanstatus",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 540,
        "y": 420,
        "wires": []
    },
    {
        "id": "ac79819c.d8803",
        "type": "debug",
        "z": "bb9c6da7.96968",
        "name": "scanstatus",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "x": 530,
        "y": 360,
        "wires": []
    },
    {
        "id": "987f7b20.d5e008",
        "type": "inject",
        "z": "bb9c6da7.96968",
        "name": "",
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "repeat": "3",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 110,
        "y": 360,
        "wires": [
            [
                "aad89496.d269c8"
            ]
        ]
    },
    {
        "id": "b38aa4c5.d08b48",
        "type": "debug",
        "z": "bb9c6da7.96968",
        "name": "request fullfilled",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 920,
        "y": 120,
        "wires": []
    },
    {
        "id": "16844ff5.890e8",
        "type": "debug",
        "z": "bb9c6da7.96968",
        "name": "delayed",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 900,
        "y": 220,
        "wires": []
    },
    {
        "id": "8ff3c327.1bde",
        "type": "inject",
        "z": "bb9c6da7.96968",
        "name": "",
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 90,
        "y": 140,
        "wires": [
            [
                "4350328d.3b0d7c"
            ]
        ]
    },
    {
        "id": "b5285ac4.5fc408",
        "type": "debug",
        "z": "bb9c6da7.96968",
        "name": "delayer",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 680,
        "y": 260,
        "wires": []
    },
    {
        "id": "a3e82c3c.8e43b",
        "type": "debug",
        "z": "bb9c6da7.96968",
        "name": "topic splitter",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 590,
        "y": 120,
        "wires": []
    },
    {
        "id": "3088f7f8.48ee28",
        "type": "debug",
        "z": "bb9c6da7.96968",
        "name": "topic for request",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "x": 520,
        "y": 80,
        "wires": []
    }
]