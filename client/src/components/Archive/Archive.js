import React from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios'
class Archive extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios
            .get(`/api/data`)
            .then(res => {

                let dataTable = []
                res.data.data.map( item => {
                    let arrItem = []
                    arrItem.push(item.site)
                    arrItem.push(item.title)
                    arrItem.push(item.description)
                    arrItem.push(item.keywords)
                    dataTable.push(arrItem)
                    return item
                })

                this.setState({data: dataTable})

            })
    }

    render() {
        const columns = ["site", "title", "description", "keywords",]
        const data = this.state.data
        const options = {
            filterType: "dropdown",
            responsive: "scroll"
        };

        return (
            <MUIDataTable
                title={"Data from MongoDb"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }
}

export default Archive