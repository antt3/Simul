import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as channelReducer from "../../store/channels";

const EditChannelForm = ({setShowModal, channel}) => {
	const [title, setTitle] = useState(channel.title);
	const [description, setDescription] = useState(channel.description);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted,setHasSubmitted] = useState(false)

    // const channels = useSelector((state) => state.channels)
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const errors = [];

		if (!title) errors.push("Title is required.");
        if (title.length > 100) errors.push("Title must be less than 100 characters.")
		if (description.length > 100) errors.push("Description must be less than 100 cahracters.");

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
		<div>
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
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
				</div>
				<div className='form_divs'>
                    <div className='form_label'><label htmlFor="description">Description</label></div>
					<textarea
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
				</div>
				<button className="form_divs form_submit" type="submit">Submit</button>
                <button onClick={(e)=> handleClick(e)}>Cancel</button>
			</form>
		</div>
	);
};

export default EditChannelForm;