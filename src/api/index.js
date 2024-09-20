import axios from "axios";
import { domain } from "../utils/urls";

const Axios = axios.create({
    baseURL: `${domain}`,
})

export default Axios