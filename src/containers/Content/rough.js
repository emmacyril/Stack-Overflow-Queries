   
    class Scroll2 extends Component {
      constructor(props) {
        super(props);
        this.state = {
          items: 20,
          hasMoreItems: true
        };
      }
    
      
    
      loadMore() {
        if(this.state.items===200){
          
          this.setState({ hasMoreItems: false});
        }else{
            setTimeout(() => {
            this.setState({ items: this.state.items + 20});
        }, 2000);
        }
        
      }
    
      render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title"> Welcome to React </h1>{" "}
            </header>
    
            <div style={{height:'200px', overflow:'auto'}}>
              <InfiniteScroll
                loadMore={this.loadMore.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={<div className="loader"> Loading... </div>}
                useWindow={false}
              >
                {this.showItems()}{" "}
              </InfiniteScroll>{" "}
            </div>{" "}
          </div>
        );
      }
    }
    
    export default Scroll2;