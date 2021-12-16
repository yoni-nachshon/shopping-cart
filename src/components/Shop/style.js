

export const style = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        margin: '1rem'
    },
    cart: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft:'1.35rem'
    },
    store: {
        display: 'flex',
        justifyContent: 'center',
        // marginLeft:'10rem',
        gap: '1rem',
        width: '100vw',

        
    },
    image: {
        height: '150px',
        width: '150px',
        marginTop:'1rem',
        marginLeft:'2.5rem',
    },
    empty: {
        height: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinner: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        '&:hover': {
            cursor: 'pointer'
        }
    }

}
