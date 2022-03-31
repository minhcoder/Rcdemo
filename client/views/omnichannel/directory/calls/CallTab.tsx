import React, { ReactElement } from 'react';

import NotAuthorizedPage from '../../../../components/NotAuthorizedPage';
import { usePermission } from '../../../../contexts/AuthorizationContext';
import CallTable from './CallTable';

// TODO Check if I need to type the setstateaction params, if I should do:
// { setCallReload: Dispatch<SetStateAction<(param: () => void) => void>> }
const CallTab = (): ReactElement => {
	const hasAccess = usePermission('view-l-room');

	if (hasAccess) {
		return <CallTable />;
	}

	return <NotAuthorizedPage />;
};

export default CallTab;
