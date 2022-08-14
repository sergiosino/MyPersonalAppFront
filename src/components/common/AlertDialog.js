import * as React from "react"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AlertDialog(props) {
    const { open, setOpen, handleAgree, title, contentText } = props

    const handleCloseClick = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseClick}>
                    Disagree
                </Button>
                <Button onClick={handleAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}