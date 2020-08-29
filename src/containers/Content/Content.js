import React, {Component} from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import Popup from '../../components/Popup/Popup';
import parse from 'html-react-parser';
import InfiniteScroll from "react-infinite-scroller";
import './Content.css';

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

class Content extends Component{
    state = {
        items: [],
        page: 1,
        more: true,
        showPopup: false,
        popupTitle: null,
        popupBody: null,
        popupLink: null
    }

    componentDidMount(){   
        this.callApiHandler();
    }

    callApiHandler = () => {
        if(this.state.more){
        axios.get(`https://api.stackexchange.com/2.2/questions?page=${this.state.page}&order=desc&sort=activity&site=stackoverflow&filter=!)EhuYxkLaV80I3JcPIkXewNs.Rqes*tW0rLKA1muNEXq9mkTr`)
        .then( response => {
            this.setState({items: this.state.items.concat(response.data.items), page: response.data.page + 1 , more: response.data.has_more});
        });
        }
    }

    showItems = () => {
        var items = [];
        this.state.items.map((i) =>
          items.push(
            <Post key={i.question_id} popup={() => this.showPopupHandler(i.title, i.body, i.link)} title= {decodeHtml(i.title)} author={i.owner.display_name} createDate={new Date(i.creation_date * 1000).toLocaleDateString()}/>
          )
        );
        console.log(items);
        return items;
    }

    closePopupHandler = () =>{
        this.setState({showPopup:false});
    }

    showPopupHandler = (title, body, link) => {
        this.setState({showPopup: true, popupTitle: title, popupBody: body, popupLink: link});
    }

    render(){
        return (
            <div className="content">
                <Popup show= {this.state.showPopup} close={this.closePopupHandler} title={decodeHtml(this.state.popupTitle)} text={parse(this.state.popupBody+'')} link={this.state.popupLink} />
                {(this.state.items) ?
                <InfiniteScroll
                loadMore={this.callApiHandler}
                hasMore={this.state.more}
                loader={<div className="loader"> Loading... </div>}
                useWindow={false}
                >
                {this.state.items.map((i, index) =>
                    <Post key={index} popup={() => this.showPopupHandler(i.title, i.body, i.link)} title= {decodeHtml(i.title)} author={i.owner.display_name} createDate={new Date(i.creation_date * 1000).toLocaleDateString()}/>
                )}
              </InfiniteScroll> : null }
            </div>
        );
    }
}

export default Content;