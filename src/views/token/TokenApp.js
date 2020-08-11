import {Component} from "react";
import axios from "axios";

class TokenApp extends Component {
  constructor(props) {
		super(props)
		this.state = {
			list: ""
		}
	}

	componentDidMount() {
    console.log("TokenApp.componentDidMount()")
		this.getApi();
	}

  getApi = () => {
		axios.get("http://localhost:38001/api/1.0/common/service/token/list")
		.then(res => {
			console.log(res);
			this.setState({
				list: res.data.tokenList
			})
		})
		.catch(res => console.log(res))
	}

}

export default TokenApp
