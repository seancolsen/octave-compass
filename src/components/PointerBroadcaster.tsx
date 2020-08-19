import React from 'react';
import { useLocalStore} from 'mobx-react-lite';

/**
 * The PointerBroadcaster component sits at basically the top of the app and is
 * used to dispatch mouse and touch data to lower-level components. It's called
 * "Pointer" because that word sort of encapsulates "mouse" and "touch". The
 * lower-level components receive the pointer data by "subscribing" to this
 * component, and then they unsubscribe when they are done.
 */

interface PointerBroadcastEventArguments {
  mouseEvent?: React.MouseEvent,
  touchEvent?: React.TouchEvent,
  isEnd?: boolean,
}

/**
 * Instances of this class are passed to lower level components 
 */
export class PointerBroadcastEvent {

  mouseEvent: React.MouseEvent | undefined;

  touchEvent: React.TouchEvent | undefined;

  isEnd: boolean;
  
  constructor(args: PointerBroadcastEventArguments) {
    this.mouseEvent = args.mouseEvent;
    this.touchEvent = args.touchEvent;
    this.isEnd = args.isEnd || false;
  }
  
}

type SendFunction = (event: PointerBroadcastEvent) => void

interface Subscriber {
  id: number,
  send: SendFunction,
};

const createStore = () => ({

  subscribers: [] as Subscriber[],
  
  /**
   * Generate a new ID that's higher than any of the current subscriber IDs.
   */
  newSubscriberId() {
    return this.subscribers.reduce(
      (max, subscriber) => (subscriber.id > max ? subscriber.id : max),
      0
    ) + 1;
  },

  /**
   * Add a new subscriber whose sendFunction will be called during all pointer
   * events.
   * 
   * @returns
   * A function which removes this subscription when called, so that the
   * component that initiated the subscription can store and use this function
   * to unsubscribe from the broadcasting later on.
   */
  addSubscriber(sendFunction: SendFunction) {
    const id = this.newSubscriberId();
    const newSubscriber = {
      id: id,
      send: sendFunction,
    };
    this.subscribers = this.subscribers.concat([newSubscriber]);
    return () => this.removeSubscriber(id);
  },

  /**
   * Remove a subscriber based on its ID.
   */
  removeSubscriber(id: number) {
    this.subscribers = this.subscribers.filter(s => s.id !== id);
  },
  
}); // createStore

const PointerBroadcasterContext = React.createContext(createStore());

/**
 * A component used to monitor a section of screen for pointer activity. Lower-
 * level components can subscribe and unsubscribe to pointer activity data that
 * this component will send to them.
 * 
 * @param props only used for children
 */
export const PointerBroadcaster: React.FC = (props) => {

  const store = useLocalStore(createStore);

  /**
   * Inform each of the subscribers of the pointer event by calling their
   * respective `send` functions one at a time.
   */
  function broadcast(args: PointerBroadcastEventArguments) {
    store.subscribers.forEach(subscriber => {
      subscriber.send(new PointerBroadcastEvent(args));
    });
  };
  
  return (
    <div
      onMouseMove={e => broadcast({mouseEvent: e})}
      onTouchMove={e => broadcast({touchEvent: e})}
      
      onMouseLeave={e => broadcast({mouseEvent: e, isEnd: true})}
      onMouseUp={e => broadcast({mouseEvent: e, isEnd: true})}
      onTouchEnd={e => broadcast({touchEvent: e, isEnd: true})}
      onTouchCancel={e => broadcast({touchEvent: e, isEnd: true})}
      
      style={{touchAction: 'none', height: '100vh', width: '100%'}}
      className='PointerBroadcaster'
    >
      <PointerBroadcasterContext.Provider value={store}>
        {props.children}
      </PointerBroadcasterContext.Provider>
    </div>
  );
  
}; // PointerBroadcaster component

/**
 * Lower-level components can use this hook as follows:
 * 
 * ```
 * const subscribeToPointer = useSubscribeToPointer();
 * 
 * // After subscribing, doSomething() will be called
 * // for mouse and touch events.
 * const doSomething = (e: PointerBroadcastEvent) => {};
 * 
 * // Subscribe to broadcasts, and store the unsubscribe
 * // function for later.
 * const unsubscribe = subscribeToPointer();
 * 
 * // Unsubscribe from broadcasts.
 * unsubscribe();
 * ```
 */
export const useSubscribeToPointer = () =>
  React.useContext(PointerBroadcasterContext).addSubscriber;
