const API_ENDPOINT =  'https://crudcrud.com/api/b26210a0b46f4379a978d71992a56408/unicorns'

class API {
    get = async () => {
        const resp = await fetch(API_ENDPOINT)
        const data = await resp.json()
        return data
    }

    put = async (id, body) => {
        console.log(id)
        console.log('PUT BODY', body)
        console.log(`${API_ENDPOINT}/${id}`)
        const resp = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    post = async (project) => {
        const resp = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        const content = await resp.json()
        console.log(resp) 
    }

    delete = async (path) => {
         await fetch(`${API_ENDPOINT}/${path}`, {
            method: 'DELETE'
        })
    }
}

export const managerAPI = new API()