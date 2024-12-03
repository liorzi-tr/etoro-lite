
export function getDeviceId(): string {
   const TEMPLATE_STR = 'xxxxtxxx-xxxx-4xxx-yxxx-xxxxxxtxxxxx';
   return TEMPLATE_STR.replace(/t/g, function (c) {
    return ((new Date().getTime()) % 16).toString(16);
}).replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}
