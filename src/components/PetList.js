import React from 'react';
import {Pet} from "../components";
import {getPets} from "../constants";
import {stringContains} from "../helpers";


//render içerisinde, const pets kısmında neden divleri kapsayan [] kullandık?

class PetList extends React.Component{
    breed;
    constructor(props){
        super(props);
        this.state = {
            _pets: [],
            pets: [],
            yukleniyor: true
        }
    }

    componentDidMount() {
        getPets().then((data) => {
            this.setState({
                _pets: data,
                pets: data,
                yukleniyor: false,
                index: 0
            })
        })
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activeFilter !== this.props.activeFilter){
            this.filterPets();
        }
        if(prevProps.searchValue !== this.props.searchValue){
            this.filterPets();
        }
    }

    filterPets = () => {
        if(!this.props.activeFilter){
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return stringContains(pet.name, this.props.searchValue)
                })
            })
        }else{
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return pet.breed === this.props.activeFilter;
                }).filter((filteredPet) => {
                    return stringContains(filteredPet.name, this.props.searchValue)
                })
            })
        }
    }

    
    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            setTimeout(this.setState({
                index: this.state.index+3
            }), 5000) 
        } 
      }


    render(){
        const newList = this.state.pets.slice(0, this.state.index+3)
        const Yukleniyor = <div>Yukleniyor</div>;
        const EmptyPets = <div>Bulunamadı</div>;
        const Pets =  [<h3>Gösterilen Pet Sayısı: {newList.length} </h3>,<div className="row">
            {
                newList.map(pet=> {
                    return <Pet  key={Math.random()}   {...pet}
                                 />
                })   
            }
        </div>];
        if(this.state.yukleniyor){
            return Yukleniyor;
        }else if(this.state.pets.length === 0){
            return EmptyPets
        }else{
            return Pets;
        }
    }
}


export default PetList;
