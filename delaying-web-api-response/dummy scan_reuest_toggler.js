msg = msg;
status = global.get("scan_enabled");
msg.payload = status;

if (status === true) {
    global.set("scan_enabled", false);
}
else {
    global.set("scan_enabled", false);
}

return msg;