import Link from '@mui/material/Link';

export default function LinkNewTab(props) {
    const { href, children, variant = "body2", underline = "hover" } = props;

    return (
        <Link href={href} underline={underline} variant={variant} target="_blank" rel="noopener">
            {children}
        </Link>
    );
}