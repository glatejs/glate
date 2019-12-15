import { useRouteMatch } from './routing';

export const useParams = () => {
    const match = useRouteMatch();
    return match ? match.params : {};
};

export const useParam = (paramName) => {
    const params = useParams();
    return params[paramName];
};
