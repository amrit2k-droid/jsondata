import React from 'react';
import Table from '../Table/Table';
import axios from 'axios';
import './Dashboard.css';
import Pagination from '../Pagination/Pagination';

class Dashboard extends React.Component {

    state = {
        tableInfo: [],
        tableInfo2: [],
        keys: [],
        dpdwn: "select",
        currentPage: 1,
        setCurrentPage: 1,
        itemPerPage: 6,
       
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                console.log(res.data);
                const user = res.data;
                let tbInfo = [];
                user.map(user => {
                    tbInfo.push({'FULL NAME': user.name, 'PHONE': user.phone, 'USER NAME': user.username, 'COMPANY NAME': user.company.name});
                })

                this.setState({
                    tableInfo: tbInfo,
                    tableInfo2: tbInfo
                })

                let keys  = [];
                for(var k in this.state.tableInfo[0]) {
                    keys.push(k);
                }

                this.setState({
                    keys: keys
                })
            })
    }

    handleClick = event => {
        /* console.log(Number(event.target.value));
        console.log(this.state.tableInfo); */
        const val = Number(event.target.value);
        const len = this.state.tableInfo.length;
        let newArray = [];
        if(event.target.value.localeCompare("select") == 0) {
            newArray = this.state.tableInfo;
            this.setState({
                tableInfo2: newArray
            })
        }
        else {
            if(val <= len) {
                for(let i = 0; i < len; i++) {
                    if(i <= val - 1) {
                        newArray.push(this.state.tableInfo[i]);
                    }
                }
    
                this.setState({
                    tableInfo2: newArray
                })
                
            } 
        }

        
        if(Number(event.target.value) > this.state.itemPerPage) {
            alert("Please select a value less than or equal to the number of items on the page.");
            event.target.value = "select";
        }
        
    }

    inputValHandler = event => {
 //       console.log(event.target.value)
        let filter = [];
        if(event.target.value != undefined || event.target.value != null) {
            this.state.tableInfo2.filter(dt => {
                if((dt['FULL NAME'].includes(event.target.value) || dt['PHONE'].includes(event.target.value)
                    || dt['USER NAME'].includes(event.target.value) || dt['COMPANY NAME'].includes(event.target.value)) 
                    && event.target.value != "") {
                    filter.push(dt);
                }
            })
            this.setState({
                tableInfo2: filter
            })
        }

        if(filter.length == 0) {
            this.state.tableInfo.map(dt => {
                filter.push(dt);
            })
            this.setState({
                tableInfo2: filter
            })
        }
         console.log(filter);
       
    }

    paginate = pageNum => {
 //       console.log(pageNum);
        this.setState({
            currentPage: pageNum
        })
    }

    render() {

        /* console.log(this.state.dpdwn);
        console.log(this.state.tableInfo);
        console.log(this.state.keys); */
    //    console.log(Object.keys(this.state.tableInfo[0]));
        
        const indexOfLastItem = this.state.currentPage * this.state.itemPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemPerPage;
        const currentItem = this.state.tableInfo2.slice(indexOfFirstItem, indexOfLastItem);
        
        return (
            <div className="Dashboard">
                <h2 className="header" style={{fontFamily: 'spotify-circular,spotify-circular-cyrillic,spotify-circular-arabic,spotify-circular-hebrew,Helvetica Neue,Helvetica,Arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif'}}>USER TABLE</h2>
                <h4 style={{float: 'right', marginRight: '150px'}}>Search <input type="text"  onChange={(event) => this.inputValHandler(event)} /></h4>
                <Table data={currentItem} />
                <div style={{float: 'left', marginLeft: '150px'}}><h4>Select quantity</h4><select ref="dataAmt" onChange={(event) => this.handleClick(event)} style={{float: 'left'}}>
                    <option value="select">select</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    </select>
                </div>
                <Pagination
                    itemPerPage={this.state.itemPerPage}
                    totalItems={this.state.tableInfo2.length}
                    paginate={this.paginate}
                />
            </div>
        )
    }
}

export default Dashboard