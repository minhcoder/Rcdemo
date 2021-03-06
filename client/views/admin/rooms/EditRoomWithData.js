import { Box, Skeleton } from '@rocket.chat/fuselage';
import React, { useMemo } from 'react';

import { AsyncStatePhase } from '../../../hooks/useAsyncState';
import { useEndpointData } from '../../../hooks/useEndpointData';
import EditRoom from './EditRoom';

function EditRoomWithData({ rid, onReload }) {
	const {
		value: data = {},
		phase: state,
		error,
		reload,
	} = useEndpointData(
		'rooms.adminRooms.getRoom',
		useMemo(() => ({ rid }), [rid]),
	);

	if (state === AsyncStatePhase.LOADING) {
		return (
			<Box w='full' pb='x24'>
				<Skeleton mbe='x4' />
				<Skeleton mbe='x8' />
				<Skeleton mbe='x4' />
				<Skeleton mbe='x8' />
				<Skeleton mbe='x4' />
				<Skeleton mbe='x8' />
			</Box>
		);
	}

	if (state === AsyncStatePhase.REJECTED) {
		return error.message;
	}

	const handleChange = () => {
		reload();
		onReload();
	};

	const handleDelete = () => {
		onReload();
	};

	return <EditRoom room={{ type: data.t, ...data }} onChange={handleChange} onDelete={handleDelete} />;
}

export default EditRoomWithData;
