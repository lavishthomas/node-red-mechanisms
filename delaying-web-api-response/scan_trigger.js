// request node

msg = msg;
msg.topic = 'request';
msg.payload = 'request started';
return msg;

// splitter node
return_msg = msg;

if (msg.topic === "delay") {
    return_msg.topic = "request_fulfilled";
    scan_status = global.get("scan_enabled");
    if (scan_status === false) {
        return_msg.topic === 'request_fulfilled'
        return_msg.payload = 'payload for out';
    }
}
else if (msg.topic === "request") {
    global.set("scan_enabled", true);
    return_msg.topic = "delay";
    return_msg.payload = "request started in splitter";
}

return return_msg;