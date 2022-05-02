import { Card, Box, Typography } from "@material-ui/core"
import { Component, WabaTemplate } from "../../../@types/getTemplatesType"

type MinimalTemplatePreviewTypes = {
    template: WabaTemplate;
    fullPreview?: boolean;
}

const contentHandler = (content: any , fullPreview : boolean | undefined) => {
    if (content.type === "HEADER") {
        if (content?.format === "TEXT") {
            return <Typography variant="h6" sx={{ color: "#fff", fontSize:  fullPreview ? '1rem' : '0.85rem' }}>{content.text}</Typography>
        }
        else if (content?.format === "IMAGE") {
            return <img width={'100%'} src={content?.example?.header_handle} />
        }
    }
    else if (content.type === "BODY") {
        return <Typography variant="body1" sx={{ whiteSpace : "pre-line", color: "#fff", fontSize : fullPreview ? '1rem' : '0.85rem' }}>{content.text}</Typography>
    }
    else if (content.type === "FOOTER") {
        return <Typography variant="body1" sx={{ color: "#fff", fontSize: '0.7rem' }}>{content.text}</Typography>
    }
    return <></>
}

export default ({ template, fullPreview }: MinimalTemplatePreviewTypes) => {
    const header = template.components.find(({ type }: Component) => type === "HEADER");
    const body = template.components.find(({ type }: Component) => type === "BODY");
    const footer = template.components.find(({ type }: Component) => type === "FOOTER");
    return (
        !fullPreview ? <Box position={"relative"}>
            <Card sx={{
                backgroundColor: "#075E54", padding: 1, justifyContent: "space-around", width: "222px", ":before": {
                    content: "''",
                    position: "absolute",
                    width: "0",
                    height: "0",
                    borderTop: "15px solid #075E54",
                    borderLeft: "15px solid transparent",
                    top: "0",
                    left: "-8px"
                }
            }} >
                {header ? <Typography mb={1}>{contentHandler(header, fullPreview)}</Typography> : ""}
                {body ? <Typography mb={1}>{contentHandler(body,fullPreview)}</Typography> : ""}
                {footer ? <Typography variant="subtitle2" sx={{ color: "#d1dddc", fontSize: "0.6rem" }} mb={1}>{contentHandler(footer,fullPreview)}</Typography> : ""}
                <Typography variant="subtitle2" textAlign={"right"} sx={{ color: "#d1dddc", fontSize: "0.6rem" }}>1:13 PM</Typography>
            </Card>
        </Box> :
            <Box position={"relative"}>
                <Card sx={{
                    backgroundColor: "#075E54", padding: 1, justifyContent: "space-around", width: "300px", ":before": {
                        content: "''",
                        position: "absolute",
                        width: "0",
                        height: "0",
                        borderTop: "15px solid #075E54",
                        borderLeft: "15px solid transparent",
                        top: "0",
                        left: "-8px"
                    }
                }} >
                    {header ? <Typography mb={1}>{contentHandler(header,fullPreview)}</Typography> : ""}
                    {body ? <Typography mb={1}>{contentHandler(body,fullPreview)}</Typography> : ""}
                    {footer ? <Typography variant="subtitle2" sx={{ color: "#d1dddc", fontSize: "0.6rem" }} mb={1}>{contentHandler(footer,fullPreview)}</Typography> : ""}
                    <Typography variant="subtitle2" textAlign={"right"} sx={{ color: "#d1dddc", fontSize: "0.6rem" }}>1:13 PM</Typography>
                </Card>
            </Box>
    )
}