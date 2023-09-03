import './App.css'
import React from 'react'
import axios from 'axios'

function App() {
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    })

    const [message, setMessage] = React.useState('')

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const dataToSend = {
            username: formData.username,
            password: formData.password,
        }
        console.log(dataToSend)

        // Post data to server
        try {
            const response = await axios.post(
                'http://localhost:8080/',
                dataToSend
            )
            if (response.status === 200) {
                setMessage('Scraping sucessfully!')
            }

            console.log('Server response:', response.data)
        } catch (error) {
            setMessage(
                'Something went wrong! Maybe your username or password was incorrect.'
            )
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <h1>Fill your school&apos;s username and password</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={formData.username}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        value={formData.password}
                        type='password'
                        name='password'
                        id='password'
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className='submit-btn'
                    type='submit'
                >
                    Start scraping!
                </button>
            </form>

            {message && (
                <div
                    onClick={() => {
                        setMessage('')
                    }}
                    className='notification'
                >
                    {message}
                </div>
            )}
        </div>
    )
}

export default App
