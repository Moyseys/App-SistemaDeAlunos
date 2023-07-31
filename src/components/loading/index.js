import React from 'react'
import PropTypes from 'prop-types'
import { Container } from './styled'

export default function Loading({ isloading }) {
    if (!isloading) return (<> </>)

    return (
        <Container>
            <div></div>
            <span>
                Carregando...
            </span>
        </Container>
    )
}

Loading.defaultProps = {
    isloding: false
}

Loading.propTypes = {
    isloding: PropTypes.bool,
}