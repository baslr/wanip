/// <reference types="node" />
import { ExecOptions } from 'child_process';
declare const ipv4Checkers: string[];
declare const checkIpv4: (options?: ExecOptions) => Promise<Map<string, number>>;
export { ipv4Checkers, checkIpv4 };
