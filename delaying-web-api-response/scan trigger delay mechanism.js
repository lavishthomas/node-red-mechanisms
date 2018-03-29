[
    {
        "id": "eb39baf9.3d1ac8",
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
        "x": 110,
        "y": 220,
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
        "timeout": "3",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 680,
        "y": 180,
        "wires": [
            [
                "7024e0a4.d1074"
            ]
        ]
    },
    {
        "id": "4350328d.3b0d7c",
        "type": "function",
        "z": "bb9c6da7.96968",
        "name": "topic splitter",
        "func": "reponse_wait_msg = msg;\nreponse_wait_msg.topic = 'request';\nreponse_wait_msg.payload = 'request started' ;\nscan_request_msg={payload:true};\n\nmsg=[reponse_wait_msg,scan_request_msg];\nreturn msg;",
        "outputs": 2,
        "noerr": 0,
        "x": 290,
        "y": 80,
        "wires": [
            [
                "7024e0a4.d1074"
            ],
            [
                "bcbc9c85.a1024"
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
        "x": 1060,
        "y": 80,
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
        "x": 350,
        "y": 220,
        "wires": [
            []
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
        "y": 320,
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
        "x": 540,
        "y": 80,
        "wires": [
            [
                "edb1d0ae.f88fe"
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
        "x": 810,
        "y": 80,
        "wires": [
            [
                "e1217b0c.ad3448"
            ],
            [
                "8121654.4ffdc98"
            ]
        ]
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
        "y": 320,
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
        "y": 320,
        "wires": [
            [
                "aad89496.d269c8"
            ]
        ]
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
        "x": 110,
        "y": 140,
        "wires": [
            [
                "4350328d.3b0d7c"
            ]
        ]
    }
]