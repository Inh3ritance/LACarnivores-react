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
        this.generateHeaders().then((headers) => {
            fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/getMaster', {
                method: "POST",
                headers,
            }).then(res => res.json()).then(response => {
                if(response.Approved){
                    this.setState({ permission: true });
                    this.loadProducts();
                } else {
                    this.setState({ permission: false });
                } 
            }).catch(err => {
                this.setState({ permission: false });
                console.log(err);
            });
        }).catch(err => {
            this.setState({ permission: false });
            console.log(err);
        });
    }

    generateHeaders = () => {
        const headers = { "Content-Type": "application/json" };
        if (netlifyIdentity.currentUser()) {
          return netlifyIdentity.currentUser().jwt().then((token) => {
            return { 
                ...headers, 
                Authorization: `Bearer ${token}`,
            };
          }).catch(err => {
            console.log(err)
          })
        }
        return Promise.resolve(headers);
      }

    sendBack = () => {
        if(this.state.permission === false)
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
                active: e.currentTarget[7].value === 'true' ? true : false,
                type: e.currentTarget[8].value,
            }),
        }).then((res) => {
            window.location.reload();
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
            window.location.reload();
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
                active: e.currentTarget[6].value === 'true' ? true : false,
                type: e.currentTarget[7].value,
            }),
        }).then((res) => {
            window.location.reload();
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
                <h1>Update existing Products</h1>
                {
                    this.state.data.map(p => {
                        return(
                        <div key = {p.id} {...p}>
                            <form onSubmit={(e)=>this.updateProduct(e)}>
                                <div className='cont'><label className='sidebysideF'>Product ID</label><input className='sidebysideF' value={p.id} disabled={true} readOnly={true}/></div>
                                <div className='cont'><label className='sidebysideF'>Name</label><input  className='sidebysideF'type='text' defaultValue={p.name}  placeholder={'name'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[0]</label><input className='sidebysideF' type='text' defaultValue={p.images[0]} placeholder={'Image url 0'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[1]</label><input className='sidebysideF' type='text' defaultValue={p.images[1]} placeholder={'Image url 1'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[2]</label><input className='sidebysideF' type='text' defaultValue={p.images[2]} placeholder={'Image url 2'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[3]</label><input className='sidebysideF' type='text' defaultValue={p.images[3]} placeholder={'Image url 3'}/></div>
                                <div className='cont'><label className='sidebysideF'>description</label><input className='sidebysideF' type='text' defaultValue={p.description} placeholder={'description'}/></div>
                                <div className='cont'><label className='sidebysideF'>active</label><input className='sidebysideF' type='text' defaultValue={p.active} placeholder={'active:true?false'}/></div>
                                <div className='cont'><label className='sidebysideF'>type</label><input className='sidebysideF' type='text' defaultValue={p.metadata.type} placeholder={'metadata type'}/></div>
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
                        <h1>Create a Product</h1>
                        <div className='cont'><label className='sidebysideF'>Name</label><input className='sidebysideF' type='text' placeholder={'name'}/></div>
                        <div className='cont'><label className='sidebysideF'>Image[0]</label><input className='sidebysideF' type='text' placeholder={'Image url 0'}/></div>
                        <div className='cont'><label className='sidebysideF'>Image[1]</label><input className='sidebysideF' type='text' placeholder={'Image url 1'}/></div>
                        <div className='cont'><label className='sidebysideF'>Image[2]</label><input className='sidebysideF' type='text' placeholder={'Image url 2'}/></div>
                        <div className='cont'><label className='sidebysideF'>Image[3]</label><input className='sidebysideF' type='text' placeholder={'Image url 3'}/></div>
                        <div className='cont'><label className='sidebysideF'>description</label><input className='sidebysideF' type='text' placeholder={'description'}/></div>
                        <div className='cont'><label className='sidebysideF'>active</label><input className='sidebysideF' type='text' placeholder={'active:true?false'}/></div>
                        <div className='cont'><label className='sidebysideF'>type</label><input className='sidebysideF' type='text' placeholder={'metadata type'}/></div>
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
            { this.sendBack() }
            { this.display() }
            <ToastContainer limit="1" />
        </div>    
        );
    }
}

export default MasterPage;