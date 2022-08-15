import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as channelReducer from "../../store/channels";

const EditChannelForm = ({setShowModal, channel}) => {
	const [title, setTitle] = useState(channel.title);
	const [description, setDescription] = useState(channel.description);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted,setHasSubmitted] = useState(false)

	const dispatch = useDispatch();
	const history = useHistory();

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

            const channel2 = {
                id: channel.id,
                title,
                description,
                user_id: channel.user_id
            };

            const editedChannel = await dispatch(channelReducer.thunkEditChannel(channel2));
            if (editedChannel) {
                setShowModal(false);
                history.push(`/channels/${editedChannel.id}`);
            };
        };
    };

    const handleClick = async(e) => {

        e.preventDefault();
        setShowModal(false);

    };

	return (
		<div className="c_div">
            <h1>Edit Your Channel</h1>
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
                        placeholder="Title"
                        className="dark"
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

export default EditChannelForm;