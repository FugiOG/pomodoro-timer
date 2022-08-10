import React, { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'

interface Props extends PropsWithChildren {
    active: boolean
    setActive: (value: boolean) => void
}

const Modal: FC<Props> = ({active, setActive, children}) => {
    return (
        <div className={classNames('my-modal', {'active': active})} onClick={() => setActive(false)}>
            <div className={classNames("my-modal__content", {'active': active})} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
