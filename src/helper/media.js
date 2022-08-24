export function getImageFromAPI(imgApi) {
    imgApi.replace("\\", "/");
    imgApi = imgApi.slice(7);
    return "http://localhost:5000" + imgApi;
}