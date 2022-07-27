import { AppError } from './app_error';
import { Modal } from './modal';
import { GraphList } from './graph_list';
import { GraphView } from './graph_view';

export class GlobalStore {
    public appError = new AppError(this);
    public modal = new Modal(this);
    public graphList = new GraphList(this);
    public graphView = new GraphView(this);
};
