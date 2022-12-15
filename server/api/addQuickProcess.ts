
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const topic_name = body.topic_name
    const description = body.description
    const weighting = body.weighting
    const proposal_end = body.proposal_end
    const voting_end = body.voting_end
    // insert to database


    return {
        id: 0,
    }
})