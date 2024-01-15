import { PollInterface } from "../types/poll.interface";

export default class PollManager {
  private poll: PollInterface[] = [];
  constructor() {
    this.poll = this.poll;
  }

  createPoll({ id, question, fields, user }: PollInterface) {
    this.poll.push({ id, question, fields, user, DateCreated: Date.now() });
  }
  getPoll(): PollInterface[] {
    return this.poll;
  }
}
