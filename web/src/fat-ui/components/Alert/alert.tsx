import React, {FC, useState} from 'react'
import classNames from 'classnames'
export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
    title: string
    description?: string
    type?: AlertType
    onClose?: () => void
    closable?: boolean
}

export const Alert: FC<AlertProps> = (props) => {
    const [hide, setHide] = useState(false)
    const {
        title,
        description,
        type,
        onClose,
        closable
    } = props
    const classes = classNames('viking-alert', {
        [`viking-alert-${type}`]: type,
    })
    const titleClass = classNames('viking-alert-title', {
        'bold-title': description
    })
    const handleClose = (e: React.MouseEvent) => {
        if(onClose) {
            onClose()
        }
        setHide(true)
    }
    return (
        <div className={classes}>
            <span className={titleClass}>{title}</span>
            {description && <p className='viking-alert-desc'>{description}</p>}
            {closable && <span className='viking-alert-close' onClick={handleClose}>X</span>}
        </div>
    )
}

Alert.defaultProps = {
    type: 'default',
    closable: true
}

export default Alert