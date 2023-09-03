import './App.css'
import React from 'react'
import axios from 'axios'

function App() {
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    })

    const [message, setMessage] = React.useState('')
    const [responseData, setResponseData] = React.useState([])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const clearLocalStorage = () => {
        localStorage.clear()
    }

    const onSubmit = async (event) => {
        event.preventDefault() // Prevent default submission
        const storedData = localStorage.getItem(formData.username)

        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setResponseData(parsedData)
            console.log(parsedData)
        } else {
            const dataToSend = {
                username: formData.username,
                password: formData.password,
            }
            console.log(dataToSend)

            // Post data to server

            const response = await axios
                .post('http://localhost:8080/', dataToSend)
                .then((res) => {
                    setResponseData(res.data)
                    localStorage.setItem(
                        formData.username,
                        JSON.stringify(res.data)
                    )
                    console.log(res.data)
                    return res // Return this response in order to use it in the next then
                })
                .catch((error) => {
                    console.log(error)
                })

            if (response.status === 200) {
                setMessage('Scraping sucessfully!')
            } else if (response.status === 401) {
                setMessage('Error scraping! Check your credentials.')
            }
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
                        onChange={handleInputChange}
                    />
                </div>

                <div className='button-wrapper'>
                    <button
                        className='submit-btn'
                        type='submit'
                    >
                        Start scraping!
                    </button>
                    <button
                        className='clear-data-btn'
                        onClick={clearLocalStorage}
                    >
                        Clear all local data
                    </button>
                </div>
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
