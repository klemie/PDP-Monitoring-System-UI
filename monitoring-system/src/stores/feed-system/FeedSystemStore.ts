import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { PAndIDNodeType } from "../../components/feed-system/nodes/types";
import { Edge } from "reactflow";

interface IFeedSystemStore {
    openSpeedDial: boolean;
    drawers: {
        nodeBuilderDrawer: boolean;
        helpDrawer: boolean;
        legendDrawer: boolean;
    },
    nodes: PAndIDNodeType[],
    edges: Edge[],
    addNode: (node: PAndIDNodeType) => void;
    addEdge: (edge: Edge) => void;
    saveToLocalStorage: () => void;
}

const FEED_SYSTEM_NODE_KEY = 'feed-system-nodes';
const FEED_SYSTEM_EDGE_KEY = 'feed-system-edges';

class FeedSystemStore implements IFeedSystemStore {
    nodes: PAndIDNodeType[] = [];
    edges: Edge[] = [];
    drawers = {
        nodeBuilderDrawer: false,
        helpDrawer: false,
        legendDrawer: false
    }
    openSpeedDial = false;
    constructor() {
        makeAutoObservable(this);
        this.getNodesFromLocalStorage();
        this.getEdgesFromLocalStorage();
    }

    private getNodesFromLocalStorage() {
        const nodes = localStorage.getItem(FEED_SYSTEM_NODE_KEY);
        if (nodes) {
            this.nodes = JSON.parse(nodes);
        }
    }

    private getEdgesFromLocalStorage() {
        const edges = localStorage.getItem(FEED_SYSTEM_EDGE_KEY);
        if (edges) {
            this.edges = JSON.parse(edges);
        }
    }

    public addNode(node: PAndIDNodeType) {
        this.nodes.push(node);
    }

    public addEdge(edge: Edge) {
        this.edges.push(edge);
    }

    public onSpeedDialEditClick(drawer: 'nodeBuilderDrawer' | 'helpDrawer' | 'legendDrawer') {
        const drawKeys: (keyof typeof this.drawers)[] = ['nodeBuilderDrawer', 'helpDrawer', 'legendDrawer'];
        this.drawers[drawer] = !this.drawers[drawer];
        this.openSpeedDial = false;
        drawKeys.forEach((key) => {
            if (key !== drawer) {
                this.drawers[key] = false;
            }
        });
    }

    public saveToLocalStorage() {
        localStorage.setItem(FEED_SYSTEM_NODE_KEY, JSON.stringify(this.nodes));
        localStorage.setItem(FEED_SYSTEM_EDGE_KEY, JSON.stringify(this.edges));
    }
}

export const FeedSystemStoreContext = createContext(new FeedSystemStore());