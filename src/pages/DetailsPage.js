import React from 'react';
import axios from "axios";
//Bunun propsu nereye bağlanmış oldu? Router içerisindeki ":" işaretini kullanmazsam this.props çıktı vermiyor. Bu da Router'ın aslında buraya props gönderdiği anlamına geliyor yanılmıyorsam?
//Router'a verdiğim ":" işaretinden sonra id bilgisi buraya, match.params içerisinde nasıl geliyor? Pet.js dosyasında Link to içerisinde id'yi vermem, Router'ı bundan nasıl haberdar ediyor? 
// Buna tekrar veri çekmektense PetList üzerinde çektiğim veriyi buraya props olarak geçip kullansam olmaz mıydı? Tekrar veri çekmek neden gerekli?

class DetailsPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            detail: []
        }
    }
    
    componentDidMount(){
        document.title = "Details Page"

        const id = this.props.match.params.id;
        console.log(id)
        
        axios.get(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${id}`)
        .then( res => {
            const detailData = res.data;
            this.setState({
                detail: detailData
            },console.log(this.state.detail))
        })

       
       /* //FETCH ALTERNATIVE

         fetch(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                detail: data
             })
         })*/
    }
    render(){
        const { age, published_at, image, breed, description} = this.state.detail;
        return(
            <div style={{marginTop: 10}}>
            <h2>Details</h2>
            <div style={{marginTop: 60}}>
                <img src={image}/>
                <div style={{marginTop: 30}}>
                    <h4 style={{color: "orange" }}>{breed}</h4>
                    <h5>{age}</h5>
                    <h6>{description}</h6>
                </div>
            </div>
        
            
            
        </div>

        )
    }

    
}

export default DetailsPage;
