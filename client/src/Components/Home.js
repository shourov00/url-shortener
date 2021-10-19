import React, {Fragment, useEffect, useState} from 'react';
import {Container, TextField} from "@material-ui/core";
import API, {base_url, website} from "../api"
import Swal from "sweetalert2";
import LoadingBackdrop from "./LoadingBackdrop";
import {useParams} from "react-router-dom";

const Home = () => {
    const { slug } = useParams();

    const [formData, setFormData] = useState({
        url: ""
    })
    const [isLoading, setLoading] = useState(false)
    const [shortenUrl, setShortenUrl] = useState("")

    const {url} = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setShortenUrl("")
    };

    useEffect(async() => {
        if(slug){
            await getUrlBySlug(slug)
        }
    }, [slug])

    const getUrlBySlug = async (slug) => {
        setLoading(true)

        try {
            const res = await API.url.getUrl(slug)

            setLoading(false)

            // redirect user to url
            let savedUrl = res.data.data.url
            if(!savedUrl.includes("https://")){
                savedUrl = "https://"+savedUrl
            }
            window.open(savedUrl, "_self").focus();

        } catch (err) {
            setLoading(false)
            await Swal.fire("Error occurred!", err.response.data, "error");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const res = await API.url.postUrl(formData)

            setLoading(false)
            setShortenUrl(website + res.data.data.slug)

            await Swal.fire("URL Shortened!", res.data.message, "success");

        } catch (err) {
            setLoading(false)
            await Swal.fire("Error occurred!", err.response.data, "error");
        }

        setFormData({
            url: ""
        })
    }

    const copyUrl = async (url) => {
        await navigator.clipboard.writeText(url)

        await Swal.fire({
            title: 'Link Copied Successfully!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <Fragment>
            <LoadingBackdrop loading={isLoading}/>

            <Container children={false}>
                <h1 className={"heading"}>Link Shortener</h1>
                <p className={"subtitle"}>A URL shortener built with Node.js, Express.js, React.js & PostgreSql. <a
                    target={"_blank"} rel={"noreferrer"} href="https://github.com/shourov00/url-shortner" >Github Repo</a></p>
                <p className={"developer"}>Developed by <a target={"_blank"} rel={"noreferrer"}
                                                           href="www.fazleyrabbi.dev">Fazley Rabbi</a></p>

                <form onSubmit={handleSubmit}>
                    <TextField
                        id="url-input"
                        type={"text"}
                        label="Shorten your link"
                        value={url}
                        required
                        fullWidth
                        name={"url"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                    />

                    <button type={"submit"}>Shorten</button>

                </form>

                {shortenUrl && <div className={"output"}>
                    <h3>{shortenUrl}</h3>

                    <button onClick={() => copyUrl(shortenUrl)}>Copy</button>
                </div>}

            </Container>

        </Fragment>
    );
}

export default Home;
