import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as channelReducer from "../../store/channels";

const CreateChannelForm = ({setShowModal, socket}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted,setHasSubmitted] = useState(false)

    // const channels = useSelector((state) => state.channels)
	const dispatch = useDispatch();
	const history = useHistory();

    const handleClick = async(e) => {

        e.preventDefault();
        setShowModal(false);

    };

	useEffect(() => {
		const errors = [];

		if (!title) errors.push("The title is required.");
        if (title.length > 100) errors.push("The title must be less than 100 characters long.");
		if (description.length > 100) errors.push("The description must be less than 100 characters long.");
        if (title) {
            const lowered = title.toLowerCase();
            setTitle(lowered);
        }

        if (title.includes(' ')) {
            const titleArr = title.split(' ');
            const dashedTitle = titleArr.join('-');
            setTitle(dashedTitle)
        }

		setValidationErrors(errors);
	}, [title, description]);

    const onSubmit = async(e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!validationErrors.length) {
            setHasSubmitted(false);

            const channel = {
                title,
                description
            };

            const newChannel = await dispatch(channelReducer.thunkAddChannel(channel));
            if (newChannel) {
                history.push(`/channels/${newChannel.id}`);
                setShowModal(false);
                socket.emit("chat", "channel");
            };
        };
    };

	return (
		<div className="c_div">
            <h1>Create A New Channel</h1>
            {hasSubmitted && validationErrors.length > 0 && (
                <div className='form_errors'>
                    <ul>
                        {validationErrors.map(error => (
                            <li className="form_error" key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
			<form className="form" onSubmit={onSubmit}>
				<div className='form_divs'>
                    <div className='form_label'><label htmlFor="title">Title</label></div>
					<input
                        name="title"
                        type="text"
                        className="dark"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
				</div>
				<div className='form_divs'>
                    <div className='form_label'><label htmlFor="description">Description</label></div>
					<textarea
                        name="description"
                        className="dark"
                        placeholder="(Optional) Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
				</div>
                <div>
                    <button className="form_divs other_cancel" onClick={(e)=> handleClick(e)}>Cancel</button>
				    <button className="form_divs other_submit" type="submit">Submit</button>
                </div>
			</form>
		</div>
	);
};

export default CreateChannelForm;