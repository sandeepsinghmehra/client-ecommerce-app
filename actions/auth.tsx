

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`;
//create a new record of user inside e-commerce
export async function createUserAccount({email, password, name}: CreateUserAccount) {
    try {
        const userAccount = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, name, password})
        });
        
        // if (userAccount) {
        //     return this.login({email, password})
        // } else {
        //     return userAccount
        // }    
    } catch (error:any) {
        throw error
    }
}

// export async function login( { email, password }: LoginUserAccount) {
//     try {
//         return await account.createEmailSession(email, password)
//     } catch (error:any) {
//      throw error
//     }
// }

// export async function isLoggedIn(): Promise<boolean> {
//     try {
//         const data = await this.getCurrentUser();
//         return Boolean(data)
//     } catch (error) {}
//         return false
// }

// export async function getCurrentUser() {
//     try {
//         return account.get()
//     } catch (error) {
//         console.log("getcurrentUser error: " + error)    
//     }
//     return null
// }

// export async function logout() {
//     try {
//         return await account.deleteSession("current")
//     } catch (error) {
//         console.log("logout error: " + error)
//     }
// }