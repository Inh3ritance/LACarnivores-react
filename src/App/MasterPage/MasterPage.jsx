import React from 'react';
import './MasterPage.scss';
import { Redirect } from 'react-router-dom';
import netlifyIdentity from "netlify-identity-widget";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

class MasterPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
          permission: null,
          data: [],
      };
    }

    componentDidMount() {
        const token = this.getUserToken();
        console.log(token);
        fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/getMaster', {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => {
            console.log(response);
            if(response.Accepted){
                this.setState({ permission: true });
                this.loadProducts();
            } else {
                this.setState({ permission: false });
            } 
        }).catch(err => {

            this.setState({ permission: true });
            this.loadProducts();

            console.log(err);
        });
    }

    async getUserToken(){
        const currentUser = netlifyIdentity.currentUser();
        if (!currentUser) {
            return;
        } else {
          await currentUser.jwt();
          return currentUser.token.access_token;
        }
    }

    sendBack = () => {
        if(this.state.permission == false)
            return(<Redirect to='/'/>);
        else if(this.state.permission == null)
            return(<div><h1 className="verify">Verifying Identity</h1></div>);
        else
            return;
    }

    loadProducts = async() => {
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/allProducts')
        .then(res => res.json())
        .then(data => {
            this.setState({ data: Array.from(data.data) });
        }).catch(err => {
            console.log(err)
        });
    }

    updateProduct = async(e) => {
        e.preventDefault();
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/updateProduct', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: e.currentTarget[0].value,
                name: e.currentTarget[1].value,
                images: [
                    e.currentTarget[2].value,
                    e.currentTarget[3].value,
                    e.currentTarget[4].value,
                    e.currentTarget[5].value,
                ],
                description: e.currentTarget[6].value,
                active: e.currentTarget[7].value == 'true' ? true : false,
                type: e.currentTarget[8].value,
            }),
        }).then((res) => {
            window.location.href = window.location.href;
            console.log(res);
        }).catch(err => {
            toast("Error", { type: 'error' });
            console.log(err);
        });
    }

    deleteProduct = async (e, id) => {
        e.preventDefault();
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/deleteProduct', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        }).then((res) => {
            window.location.href = window.location.href;
            console.log(res);
        }).catch(err => {
            toast("Error", { type: 'error' });
            console.log(err);
        });
    }

    // copy from update to save time...
    createProduct = async(e) => {
        e.preventDefault();
        await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/createProduct', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: e.currentTarget[0].value,
                images: [
                    e.currentTarget[1].value,
                    e.currentTarget[2].value,
                    e.currentTarget[3].value,
                    e.currentTarget[4].value,
                ],
                description: e.currentTarget[5].value,
                active: e.currentTarget[6].value == 'true' ? true : false,
                type: e.currentTarget[7].value,
            }),
        }).then((res) => {
            window.location.href = window.location.href;
            console.log(res);
        }).catch(err => {
            toast("Error", { type: 'error' });
            console.log(err);
        });
    }

    display = () => {
        if(this.state.permission)
            return(
                <div className='container-products'>
                {
                    this.state.data.map(p => {
                        return(
                        <div key = {p.id} {...p}>
                            <form onSubmit={(e)=>this.updateProduct(e)}>
                                <input value={p.id} disabled={true} readOnly={true}/>
                                <input type='text' defaultValue={p.name}  placeholder={'name'}/>
                                <input type='text' defaultValue={p.images[0]} placeholder={'Image url 0'}/>
                                <input type='text' defaultValue={p.images[1]} placeholder={'Image url 1'}/>
                                <input type='text' defaultValue={p.images[2]} placeholder={'Image url 2'}/>
                                <input type='text' defaultValue={p.images[3]} placeholder={'Image url 3'}/>
                                <input type='text' defaultValue={p.description} placeholder={'description'}/>
                                <input type='text' defaultValue={p.active} placeholder={'active:true?false'}/>
                                <input type='text' defaultValue={p.metadata.type} placeholder={'metadata type'}/>
                                <button type='submit'className='MasterPageButton'>update</button>
                            </form>
                            <form onSubmit={(e)=>this.deleteProduct(e, p.id)}>
                                <button className='MasterPageButton' type='submit'>delete</button>
                            </form>
                            <hr/>
                        </div>
                        )
                    })
                }
                    <form onSubmit={(e)=>this.createProduct(e)}>
                        <input type='text' placeholder={'name'}/>
                        <input type='text' placeholder={'Image url 0'}/>
                        <input type='text' placeholder={'Image url 1'}/>
                        <input type='text' placeholder={'Image url 2'}/>
                        <input type='text' placeholder={'Image url 3'}/>
                        <input type='text' placeholder={'description'}/>
                        <input type='text' placeholder={'active:true?false'}/>
                        <input type='text' placeholder={'metadata type'}/>
                        <button type='submit' className='MasterPageButton'>create</button>
                    </form>
                </div>
            );
        else
            return(<div>Loading...</div>);
    }

    render() {
        return(
        <div>
            {
                this.sendBack(),
                this.display()
            }
            <ToastContainer limit="1" />
        </div>    
        );
    }
}

export default MasterPage;