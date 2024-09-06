import axios from "axios";

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-'

const axiosInstance= axios.create({
    baseURL: "http://localhost/dolibarr/htdocs/api/index.php/",
});

axiosInstance.defaults.headers.common[
    "Authorization"
] = `Bearer YOUR_ACCESS_TOKEN`;
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
