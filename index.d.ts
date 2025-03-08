import type { Handler } from 'express';

export function requireHeader(header: string, message?: string): Handler;
