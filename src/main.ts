import './style.css'
import { connectToParent } from "penpal";

// Connect to the parent iframe
const connection = connectToParent<ParentApi>({
  methods: {},
});

// Expose a function to send an example event to the parent iframe
window.sendExampleEvent = () => {
  connection.promise.then(parent => {
    parent.behaviorEvent({ interaction_type: 'example_click'});
  });
}

// The API that the parent window exposes
type ParentApi = {
  behaviorEvent: (event: BehaviorEvent) => void;
};

// Schema of behavior event payloads
type BehaviorEvent = {
  interaction_type?: string | null;
  funnel_stage?: string | null;
  module_location?: string | null;
  module_name?: string | null;
  event_value?: string | null;
  event_location?: string | null;
  click_url?: string | null;
};

// Make typescript chill about adding the exposed method
declare global {
  interface Window {
    sendExampleEvent: () => void;
  }
}
