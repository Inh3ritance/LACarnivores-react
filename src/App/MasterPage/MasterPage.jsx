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
            return(<h1 className="verify">Verifying Identity</h1>);
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
        const x = e.currentTarget;
        console.log(x);
        e.preventDefault();
        this.generateHeaders().then(async (headers) => {
            console.log("inside");
            console.log(x);
            console.log(x[0]);
            await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/updateProduct', {
                method: "POST",
                headers,
                body: JSON.stringify({
                    id: e.currentTarget[0].value,
                    review_id: e.currentTarget[1].value,
                    name: e.currentTarget[2].value,
                    images: [
                        e.currentTarget[3].value,
                        e.currentTarget[4].value,
                        e.currentTarget[5].value,
                        e.currentTarget[6].value,
                    ],
                    description: e.currentTarget[7].value,
                    active: e.currentTarget[8].value === 'true' ? true : false,
                    type: e.currentTarget[9].value,
                    quantity: e.currentTarget[10].value,
                    price: e.currentTarget[11].value,
                    featured: e.currentTarget[12].value,
                    width: e.currentTarget[13].value,
                    height: e.currentTarget[14].value,
                    length: e.currentTarget[15].value,
                    weight: e.currentTarget[16].value,
                    recieve: e.currentTarget[17].value,
                    zones: e.currentTarget[18].value,
                    water: e.currentTarget[19].value,
                    soil: e.currentTarget[20].value,
                    light: e.currentTarget[21].value,
                }),
            }).then((res) => {
                window.location.reload();
                console.log(res);
            }).catch(err => {
                toast("Error", { type: 'error' });
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    // copy from update to save time...
    createProduct = async(e) => {
        e.preventDefault();
        this.generateHeaders().then(async (headers) => {
            await fetch('https://lacarnivoresapi.netlify.app/.netlify/functions/api/createProduct', {
                method: "POST",
                headers,
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
                    quantity: e.currentTarget[8].value,
                    price: e.currentTarget[9].value,
                    featured: e.currentTarget[10].value,
                    width: e.currentTarget[11].value,
                    height: e.currentTarget[12].value,
                    length: e.currentTarget[13].value,
                    weight: e.currentTarget[14].value,
                    recieve: e.currentTarget[15].value,
                    zones: e.currentTarget[16].value,
                    water: e.currentTarget[17].value,
                    soil: e.currentTarget[18].value,
                    light: e.currentTarget[19].value,
                }),
            }).then((res) => {
                window.location.reload();
                console.log(res);
            }).catch(err => {
                toast("Error", { type: 'error' });
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        })
    }

    // In the future use dropdowns and checkboxes to create products rapidly
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
                                <div className='cont'><label className='sidebysideF'>Review ID</label><input className='sidebysideF' value={p.metadata.review_id} disabled={true} readOnly={true}/></div>
                                <div className='cont'><label className='sidebysideF'>Name</label><input  className='sidebysideF'type='text' defaultValue={p.name}  placeholder={'name'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[0]</label><input className='sidebysideF' type='text' defaultValue={p.images[0]} placeholder={'Image url 0'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[1]</label><input className='sidebysideF' type='text' defaultValue={p.images[1]} placeholder={'Image url 1'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[2]</label><input className='sidebysideF' type='text' defaultValue={p.images[2]} placeholder={'Image url 2'}/></div>
                                <div className='cont'><label className='sidebysideF'>Image[3]</label><input className='sidebysideF' type='text' defaultValue={p.images[3]} placeholder={'Image url 3'}/></div>
                                <div className='cont'><label className='sidebysideF'>description</label><input className='sidebysideF' type='text' defaultValue={p.description} placeholder={'description'}/></div>
                                <div className='cont'><label className='sidebysideF'>active</label><input className='sidebysideF' type='text' defaultValue={p.active} placeholder={'active:true?false'}/></div>
                                <div className='cont'><label className='sidebysideF'>type</label><input className='sidebysideF' type='text' defaultValue={p.metadata.type} placeholder={'metadata type'}/></div>
                                <div className='cont'><label className='sidebysideF'>quantity</label><input className='sidebysideF' type='text' defaultValue={p.metadata.quantity} placeholder={'metadata quantity'}/></div>
                                <div className='cont'><label className='sidebysideF'>price</label><input className='sidebysideF' type='text' defaultValue={p.metadata.price} placeholder={'sku price'}/></div>
                                <div className='cont'><label className='sidebysideF'>featured</label><input className='sidebysideF' type='text' defaultValue={p.metadata.featured} placeholder={'y/n'}/></div>
                                <div className='cont'><label className='sidebysideF'>width</label><input className='sidebysideF' type='text' defaultValue={p.metadata.width} placeholder={'1 inch.'}/></div>
                                <div className='cont'><label className='sidebysideF'>height</label><input className='sidebysideF' type='text' defaultValue={p.metadata.height} placeholder={'1 inch.'}/></div>
                                <div className='cont'><label className='sidebysideF'>length</label><input className='sidebysideF' type='text' defaultValue={p.metadata.length} placeholder={'1 inch.'}/></div>
                                <div className='cont'><label className='sidebysideF'>weight</label><input className='sidebysideF' type='text' defaultValue={p.metadata.weight} placeholder={'1 lb'}/></div>
                                <div className='cont'><label className='sidebysideF'>recieve</label><input className='sidebysideF' type='text' defaultValue={p.metadata.recieve} placeholder={'recieve'}/></div>
                                <div className='cont'><label className='sidebysideF'>Zones</label><input className='sidebysideF' type='text' defaultValue={p.metadata.zones} placeholder={'0-9'}/></div>
                                <div className='cont'><label className='sidebysideF'>Water</label><input className='sidebysideF' type='text' defaultValue={p.metadata.water} placeholder={'water'}/></div>
                                <div className='cont'><label className='sidebysideF'>Soil</label><input className='sidebysideF' type='text' defaultValue={p.metadata.soil} placeholder={'peatmoss'}/></div>
                                <div className='cont'><label className='sidebysideF'>Lighting</label><input className='sidebysideF' type='text' defaultValue={p.metadata.light} placeholder={'lighting'}/></div>
                                <button type='submit'className='MasterPageButton'>update</button>
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
                        <div className='cont'><label className='sidebysideF'>quantity</label><input className='sidebysideF' type='text' placeholder={'metadata quantity'}/></div>
                        <div className='cont'><label className='sidebysideF'>price</label><input className='sidebysideF' type='text' placeholder={'sku price'}/></div>
                        <div className='cont'><label className='sidebysideF'>featured</label><input className='sidebysideF' type='text' placeholder={'y/n'}/></div>
                        <div className='cont'><label className='sidebysideF'>width</label><input className='sidebysideF' type='text' placeholder={'1 inch.'}/></div>
                        <div className='cont'><label className='sidebysideF'>height</label><input className='sidebysideF' type='text' placeholder={'1 inch.'}/></div>
                        <div className='cont'><label className='sidebysideF'>length</label><input className='sidebysideF' type='text' placeholder={'1 inch.'}/></div>
                        <div className='cont'><label className='sidebysideF'>weight</label><input className='sidebysideF' type='text' placeholder={'1 lb'}/></div>
                        <div className='cont'><label className='sidebysideF'>recieve</label><input className='sidebysideF' type='text' placeholder={'recieve'}/></div>
                        <div className='cont'><label className='sidebysideF'>Zones</label><input className='sidebysideF' type='text' placeholder={'0-9'}/></div>
                        <div className='cont'><label className='sidebysideF'>Water</label><input className='sidebysideF' type='text' placeholder={'water'}/></div>
                        <div className='cont'><label className='sidebysideF'>Soil</label><input className='sidebysideF' type='text' placeholder={'peatmoss'}/></div>
                        <div className='cont'><label className='sidebysideF'>Lighting</label><input className='sidebysideF' type='text' placeholder={'lighting'}/></div>
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