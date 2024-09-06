import Axios from "axios";
import { AuthContext } from "../contexts/authContext";

class DolibarrApiService {
    Axios = null;

    AxiosConfig = {
        baseURL: "http://localhost/dolibarr/htdocs/api/index.php/",
    };

    constructor() {
        console.log(this.context);
        this.Axios = Axios.create(this.AxiosConfig);
        if (this.context?.user?.dolitoken) {
            this.Axios.defaults.headers = {
                headers: {
                    DOLAPIKEY: this.context.user.dolitoken,
                },
            };
        }
    }
}

DolibarrApiService.contextType = AuthContext;
export default DolibarrApiService;
