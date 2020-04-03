import React, { Component, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Avatar from 'react-avatar-edit'
import { setUserLoading } from '../../actions/authActions';

// function upload() {

//     const [image, setImage] = useState('');
//         const [loading, setLoading] = useState(false);

//         const uploadImage = async e => {
//             const files = e.target.files
//             const data = new FormData()
//             data.append('file',files[0])
//             data.append('upload_preset','fahi8ukz')
//             this.state.setLoading(true);
//             const res = await fetch(
//                 'https://api.cloudinary.com/v1_1/draeokkz7/image/upload',
//                 {
//                     method: 'POST',
//                     body: data
//                 }
    
//             )
//             const file = await res.json()
    
//             setImage(file.secure_url)
//             setLoading(false);
//             console.log("Image uploaded")
//         }

// }

export default class EditUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            role: '',
            date: new Date(),
            profileImg: null,
            preview: null,
            // image: '',
            // setImage: '',
            // loading: false,
            // setLoading: false

        }

       
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        
    }
// Get a single project record
    componentDidMount() {

        axios.get('https://my-bugtracker-app.herokuapp.com/api/users/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role,
                    date: new Date(res.data.date)
                })
                console.log("retrieved info: " +res.data)
            })
            .catch(function(error) {
                console.log("Error " + error)
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    onChangeDate(date) {

        this.setState({
            date: date
        });
    }

    fileSelectedHandler = event => {
        console.log(event)
        this.setState({
            profileImg: event.target.files[0]
            
        })
        
    }
    onClose() {
        this.setState({preview: null})
        }
        
        onCrop(preview) {
            this.setState({preview})
        }
        
        onBeforeFileLoad(elem) {
            if(elem.target.files[0].size > 71680){
            alert("File is too big!");
            elem.target.value = "";
            };
        }

    // fileUploadHandler = () = {
    //     axios
    // }

    onSubmitForm(e) {
        e.preventDefault();

        console.log("form submitted");
        console.log(`name: ${this.state.name}`);
        console.log(`date: ${this.state.date}`);
        console.log(`email: ${this.state.email}`);
        console.log(`role: ${this.state.role}`);

        const updatedUser = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            date: this.state.date,
            profileImg: this.state.preview

        }

        


        //Update a new project
        axios.patch('http://localhost:4000/api/users/'+this.props.match.params.id,updatedUser)
            .then(res => console.log(res.data),
            this.props.history.push("/usersList"));
            
    

    }


    render() {

        
        
        return (
            <div className="container">
                <h3>Update a User</h3>
                <div style={{marginTop: 20}}>
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                />
                        </div>


                        <br />
                        <div className="form-group">
                            <label>Role: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.role}
                                    onChange={this.onChangeRole}
                                />
                        </div>
                        
            

                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                        </div>

                        {/* <div className="form-group">
                            <label>Upload a Profile Image:</label>
                            <br />
                            <input type="file" 
                                
                                onChange={this.fileSelectedHandler} />
                            
                        </div> */}
                        <div className="form-group">

                        
                        {/* <Avatar
                            width={250}
                            height={250}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            onBefore={this.onBeforeFileLoad}
                            profileImg={this.state.profileImg}
                        />
                            <img src={this.state.preview} alt="Preview" />
                         */}
                        </div>
{/* 
                        <input type="file"
                                placeholder="Upload an image"
                                name="file"
                                onChange={uploadImage} />

                        {loading ? (
                            <h3>Loading....</h3>
                        ): (<img src={image} style={{width: '200px'}} />
                        )} */}

                        <div className="form-group">
                            <input type="submit" value="Update User" className="btn btn-primary" />
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        )
    }
}