import React, {Component} from 'react';
import Pagination from '../Pagination/Pagination';

class Table extends Component {

    state = {
        user: this.props.data
    }

    getKeys = () => {
        let keys  = [];
        for(var k in this.props.data[0]) {
            keys.push(k);
        }
        return keys
    }

    getRowsData = () => {
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    getHeader = () => {
        var keys = this.getKeys();
        return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
        })
        }

      render() {
    //    let keys = Object.keys(this.props.data[0]);
  //      const keys = Object.keys(this.props.data[0]);
    //    console.log(this.state.user)
            return (
                <div className="Table">
                    <div className="container">
                        <table className="table table-striped">
                            <thead>
                                <tr>{this.getHeader()}</tr>
                            </thead>
                            <tbody>
                                {this.getRowsData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
    }
}

export default Table

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
   }